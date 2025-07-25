import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCorMyOjbOOJDcPkWzz0UzPTKoPEM74z4g";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeMedia = async (file: File): Promise<string> => {
  try {
    console.log('Starting media analysis...');
    
    // Convert file to base64
    const fileBase64 = await fileToBase64(file);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Analyze this ${file.type.startsWith('video/') ? 'video' : 'image'} of a plant and provide a comprehensive disease analysis report. Please include:

    1. **Plant Identification**: What type of plant is shown in the ${file.type.startsWith('video/') ? 'video' : 'image'}?
    
    2. **Disease Assessment**: 
       - Are there any visible signs of disease or pest damage?
       - What specific symptoms do you observe (spots, discoloration, wilting, etc.)?
       - What diseases or conditions might these symptoms indicate?
    
    3. **Severity Level**: Rate the severity from 1-10 (1 being healthy, 10 being severely diseased)
    
    4. **Treatment Recommendations**:
       - Immediate actions to take
       - Recommended treatments (organic/chemical)
       - Prevention measures
    
    5. **Prognosis**: What's the likely outcome with and without treatment?
    
    6. **Additional Care Tips**: General care recommendations for this plant type
    
    Please be thorough but concise, and format the response clearly with headers and bullet points where appropriate.
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: fileBase64,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing media:', error);
    throw new Error('Failed to analyze media. Please try again.');
  }
};

// Keep the old function for backward compatibility
export const analyzeVideo = analyzeMedia;

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the data:video/mp4;base64, or data:image/jpeg;base64, prefix
      const base64Data = base64.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};
