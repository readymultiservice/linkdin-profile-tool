import { GoogleGenAI, Type } from "@google/genai";
import type { 
    ProfileData, 
    AnalysisResult, 
    InstantScoreData, 
    InstantScoreResult,
    FileData,
    ResumeData,
    CompareData,
    JobMatchAnalysisResult,
    ContentStrategyInput,
    ContentStrategyResult,
    KeywordResearchInput,
    KeywordResearchResult,
    HashtagStrategyInput,
    HashtagStrategyResult
} from '../types';

// According to guidelines, API key must be from process.env.API_KEY
// and the AI client must be initialized like this.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisResultSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.OBJECT,
            properties: {
                headline: { type: Type.STRING, description: 'An improved, keyword-rich headline.' },
                summary: { type: Type.STRING, description: 'An enhanced, impactful summary.' },
                experiences: {
                    type: Type.ARRAY,
                    description: 'A list of improved experience descriptions.',
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            originalJobTitle: { type: Type.STRING, description: 'The original job title for reference.' },
                            improvedDescription: { type: Type.STRING, description: 'An improved, achievement-oriented description for the experience section.' },
                        },
                        required: ['originalJobTitle', 'improvedDescription'],
                    },
                },
            },
            required: ['headline', 'summary', 'experiences'],
        },
        score: {
            type: Type.OBJECT,
            properties: {
                overall: { type: Type.INTEGER, description: 'The overall profile score from 0 to 100.' },
                breakdown: {
                    type: Type.OBJECT,
                    properties: {
                        headline: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.INTEGER, description: 'Score for the headline (0-100).' },
                                feedback: { type: Type.STRING, description: 'Feedback for the headline.' },
                            },
                             required: ['score', 'feedback'],
                        },
                        summary: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.INTEGER, description: 'Score for the summary (0-100).' },
                                feedback: { type: Type.STRING, description: 'Feedback for the summary.' },
                            },
                             required: ['score', 'feedback'],
                        },
                        experience: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.INTEGER, description: 'Score for the experience section (0-100).' },
                                feedback: { type: Type.STRING, description: 'Feedback for the experience section.' },
                            },
                             required: ['score', 'feedback'],
                        },
                        skills: {
                            type: Type.OBJECT,
                            properties: {
                                score: { type: Type.INTEGER, description: 'Score for the skills section (0-100).' },
                                feedback: { type: Type.STRING, description: 'Feedback for the skills section.' },
                            },
                             required: ['score', 'feedback'],
                        },
                    },
                    required: ['headline', 'summary', 'experience', 'skills'],
                },
            },
            required: ['overall', 'breakdown'],
        },
    },
    required: ['suggestions', 'score'],
};

const instantScoreResultSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER, description: "Overall score from 0-100." },
        breakdown: {
            type: Type.OBJECT,
            properties: {
                clarity: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING } }, required: ['score', 'feedback'] },
                relevance: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING } }, required: ['score', 'feedback'] },
                impact: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING } }, required: ['score', 'feedback'] },
                keywords: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING } }, required: ['score', 'feedback'] },
                completeness: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, feedback: { type: Type.STRING } }, required: ['score', 'feedback'] },
            },
            required: ["clarity", "relevance", "impact", "keywords", "completeness"],
        },
        currentStatus: {
            type: Type.OBJECT,
            properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["strengths", "weaknesses"],
        },
        improvementTips: {
            type: Type.OBJECT,
            properties: {
                headline: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, impact: { type: Type.INTEGER }, ease: { type: Type.INTEGER } }, required: ['suggestion', 'impact', 'ease'] } },
                summary: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, impact: { type: Type.INTEGER }, ease: { type: Type.INTEGER } }, required: ['suggestion', 'impact', 'ease'] } },
                experience: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, impact: { type: Type.INTEGER }, ease: { type: Type.INTEGER } }, required: ['suggestion', 'impact', 'ease'] } },
                skills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { suggestion: { type: Type.STRING }, impact: { type: Type.INTEGER }, ease: { type: Type.INTEGER } }, required: ['suggestion', 'impact', 'ease'] } },
            },
            required: ["headline", "summary", "experience", "skills"],
        },
        keywordRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        optimizedHeadlines: { type: Type.ARRAY, items: { type: Type.STRING } },
        optimizedSummary: { type: Type.STRING },
        comparison: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                missingInLinkedIn: { type: Type.ARRAY, items: { type: Type.STRING } },
                missingInResume: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['summary', 'missingInLinkedIn', 'missingInResume'],
        },
    },
    required: ["overallScore", "breakdown", "currentStatus", "improvementTips", "keywordRecommendations", "optimizedHeadlines", "optimizedSummary"],
};

const jobMatchAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER, description: "Overall match score (0-100)." },
        sections: {
            type: Type.OBJECT,
            properties: {
                headline: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, explanation: { type: Type.STRING } }, required: ['score', 'explanation'] },
                summary: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, explanation: { type: Type.STRING } }, required: ['score', 'explanation'] },
                experience: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, explanation: { type: Type.STRING } }, required: ['score', 'explanation'] },
                skills: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, explanation: { type: Type.STRING } }, required: ['score', 'explanation'] },
                formatting: { type: Type.OBJECT, properties: { score: { type: Type.INTEGER }, explanation: { type: Type.STRING } }, required: ['score', 'explanation'] }
            },
            required: ['headline', 'summary', 'experience', 'skills', 'formatting']
        },
        missingKeywords: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    keyword: { type: Type.STRING },
                    importance: { type: Type.STRING, enum: ['MUST', 'NICE-TO-HAVE'] }
                },
                required: ['keyword', 'importance']
            }
        },
        suggestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    section: { type: Type.STRING },
                    text: { type: Type.STRING },
                    impact: { type: Type.INTEGER, description: "Score from 1-5" },
                    ease: { type: Type.INTEGER, description: "Score from 1-5" }
                },
                required: ['section', 'text', 'impact', 'ease']
            }
        },
        optimizedContent: {
            type: Type.OBJECT,
            properties: {
                headlines: { type: Type.ARRAY, items: { type: Type.STRING } },
                summaries: { type: Type.ARRAY, items: { type: Type.STRING } },
                experienceBullets: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['headlines', 'summaries', 'experienceBullets']
        },
        keywordPlacements: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    keyword: { type: Type.STRING },
                    place: { type: Type.STRING, description: "e.g., 'Skills Section', 'Experience bullet 2'" }
                },
                required: ['keyword', 'place']
            }
        },
        atsReadiness: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    check: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ['Pass', 'Fail', 'Warn'] },
                    recommendation: { type: Type.STRING }
                },
                required: ['check', 'status', 'recommendation']
            }
        }
    },
    required: ['overallScore', 'sections', 'missingKeywords', 'suggestions', 'optimizedContent', 'keywordPlacements', 'atsReadiness']
};


const contentStrategySchema = {
    type: Type.OBJECT,
    properties: {
        contentCalendar: {
            type: Type.ARRAY,
            description: "A 30-day content calendar plan.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    postType: { type: Type.STRING, description: "e.g., Educational, Storytelling, Poll, Carousel Idea" },
                    topicIdea: { type: Type.STRING, description: "A brief idea for the post topic." }
                },
                required: ['day', 'postType', 'topicIdea']
            }
        },
        trendingTopics: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 5 trending, high-engagement topics for the user's niche."
        },
        postDrafts: {
            type: Type.ARRAY,
            description: "At least 3 full LinkedIn post drafts.",
            items: {
                type: Type.OBJECT,
                properties: {
                    hook: { type: Type.STRING, description: "An attention-grabbing opening line." },
                    body: { type: Type.STRING, description: "The main content of the post (200-400 words)." },
                    cta: { type: Type.STRING, description: "A call-to-action to encourage engagement." },
                    hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['hook', 'body', 'cta', 'hashtags']
            }
        },
        engagementTips: {
            type: Type.OBJECT,
            properties: {
                postingTimes: { type: Type.STRING, description: "Recommended best days and times to post." },
                strategies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable strategies to maximize reach and engagement." }
            },
            required: ['postingTimes', 'strategies']
        }
    },
    required: ['contentCalendar', 'trendingTopics', 'postDrafts', 'engagementTips']
};

const contentOutlineNodeSchema: any = {
    type: Type.OBJECT,
    properties: {
        heading: { type: Type.STRING },
        children: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    heading: { type: Type.STRING },
                     children: {
                        type: Type.ARRAY,
                        items: {
                           type: Type.OBJECT,
                           properties: {
                                heading: { type: Type.STRING },
                           },
                           required: ['heading']
                        }
                    }
                },
                required: ['heading']
            }
        }
    },
    required: ['heading']
};

const keywordResearchSchema = {
    type: Type.OBJECT,
    properties: {
        keywordList: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    keyword: { type: Type.STRING },
                    volume: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                    difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
                    intent: { type: Type.STRING, description: "e.g., informational, transactional, job-search" },
                    suggestedUse: { type: Type.STRING, description: "e.g., resume, LinkedIn headline, blog post" }
                },
                required: ['keyword', 'volume', 'difficulty', 'intent', 'suggestedUse']
            }
        },
        topKeywords: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of the top 10 high-impact keywords."
        },
        titleSuggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-5 optimized titles/headlines using the keywords."
        },
        contentOutline: contentOutlineNodeSchema,
        hashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of relevant hashtags for social media."
        }
    },
    required: ['keywordList', 'topKeywords', 'titleSuggestions', 'contentOutline', 'hashtags']
};

const hashtagStrategySchema = {
    type: Type.OBJECT,
    properties: {
        fullHashtagList: {
            type: Type.OBJECT,
            properties: {
                highReach: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Broad, trending, high-volume hashtags." },
                mediumCompetition: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Balanced hashtags with good reach and relevance." },
                niche: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific, long-tail hashtags for a targeted audience." }
            },
            required: ['highReach', 'mediumCompetition', 'niche']
        },
        topHashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "The top 10 recommended hashtags that best fit the user's input."
        },
        postingStrategy: {
            type: Type.OBJECT,
            properties: {
                howMany: { type: Type.STRING, description: "A recommendation on how many hashtags to use for the platform." },
                combination: { type: Type.STRING, description: "The best mix of hashtag types (e.g., 3 trending + 5 niche)." },
                placement: { type: Type.STRING, description: "Where to place the hashtags (e.g., in the caption, in the first comment)." }
            },
            required: ['howMany', 'combination', 'placement']
        },
        emergingHashtags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of new or emerging hashtags in the niche for better visibility."
        }
    },
    required: ['fullHashtagList', 'topHashtags', 'postingStrategy', 'emergingHashtags']
};


// Function for the main analysis page
export const analyzeProfile = async (profileData: ProfileData): Promise<AnalysisResult> => {
    const prompt = `
        Analyze the following LinkedIn profile data and provide suggestions for improvement and a score.
        The user wants to optimize their profile for professional branding and attracting recruiters.
        
        Profile Data:
        - Full Name: ${profileData.fullName}
        - Headline: ${profileData.headline}
        - Summary: ${profileData.summary}
        - Experiences: ${profileData.experiences.map(e => `\n  - ${e.jobTitle} at ${e.company}: ${e.description}`).join('')}
        - Skills: ${profileData.skills}

        Tasks:
        1.  **Suggestions**:
            -   Rewrite the headline to be more impactful and keyword-rich.
            -   Rewrite the summary to be a compelling professional narrative.
            -   For each work experience, rewrite the description to focus on achievements and metrics (e.g., "Led a team that increased user engagement by 25%"). Use strong action verbs.
        2.  **Score**:
            -   Provide an overall score (0-100) based on the profile's effectiveness.
            -   Provide a breakdown score (0-100) and brief feedback for: Headline, Summary, Experience, and Skills.
        
        Return the analysis in JSON format according to the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: analysisResultSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisResult;

    } catch (error) {
        console.error("Error analyzing profile with Gemini API:", error);
        throw new Error("Failed to get analysis from AI. Please check the console for more details.");
    }
};

// Functions for the instant score page

const createInstantScorePrompt = (
    documentType: string, 
    documentText: string, 
    data: InstantScoreData | ResumeData,
    comparisonText: string = ''
): string => {
    let prompt = `
        Analyze the following ${documentType} text for a user targeting the job title "${data.targetJobTitle}" in the "${data.industry}" industry.
        Provide a detailed analysis and score based on the content. The breakdown scores for each category should sum up to the overall score, with each category being worth 20 points for a total of 100.
        
        ${documentType} Text:
        ---
        ${documentText}
        ---
    `;

    if ('profileText' in data) { // It's InstantScoreData
        prompt += `
        Additional LinkedIn Context:
        - Has professional photo: ${data.hasPhoto}
        - Has featured content: ${data.hasFeaturedContent}
        - Connections count: ${data.connectionsCount}
        `;
    }

    if (comparisonText) {
        prompt += `
        For Comparison - Resume Text:
        ---
        ${comparisonText}
        ---

        Task: Compare the LinkedIn profile to the resume. Identify key skills, experiences, or keywords present in one but missing in the other. Provide a summary of the alignment and list specific items to add to each document to create consistency.
        `;
    }

    prompt += `
        Based on this, perform the following tasks and return the result in a single JSON object matching the provided schema:
        1.  **Overall Score**: An integer from 0-100.
        2.  **Breakdown**: Score (0-20) and feedback for:
            -   'clarity': How clear and easy to understand is the content?
            -   'relevance': How relevant is the content to the target job and industry?
            -   'impact': Does the content showcase achievements and results?
            -   'keywords': Is it optimized with relevant keywords for the target role?
            -   'completeness': How complete is the profile/resume? (For LinkedIn, consider photo, featured content, etc.).
        3.  **Current Status**: Two arrays of strings: 'strengths' and 'weaknesses' (2-3 bullet points for each).
        4.  **Improvement Tips**: For 'headline', 'summary', 'experience', and 'skills', provide an array of actionable suggestions. Each tip must have a 'suggestion' (string), 'impact' (integer 1-5), and 'ease' (integer 1-5).
        5.  **Keyword Recommendations**: A list of the top 10 keywords the user should include.
        6.  **Optimized Headlines**: 3 rewritten, optimized headline variations.
        7.  **Optimized Summary**: 1 rewritten, optimized summary/objective.
        8.  **Comparison**: If a comparison was requested, provide the comparison analysis.
    `;
    return prompt;
};

const callGeminiForInstantScore = async (prompt: string, contents: any): Promise<InstantScoreResult> => {
     try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: instantScoreResultSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as InstantScoreResult;

    } catch (error) {
        console.error("Error with Gemini API instant score:", error);
        throw new Error("Failed to get instant score from AI. The model may have returned an invalid format.");
    }
};


export const getInstantProfileScore = async (data: InstantScoreData): Promise<InstantScoreResult> => {
    const prompt = createInstantScorePrompt("LinkedIn Profile", data.profileText, data);
    return callGeminiForInstantScore(prompt, prompt);
};

export const getInstantResumeScore = async (file: FileData, data: ResumeData): Promise<InstantScoreResult> => {
    const prompt = createInstantScorePrompt("Resume", "The user has provided a resume document for analysis.", data);
    const imagePart = {
        inlineData: {
            mimeType: file.mimeType,
            data: file.base64,
        },
    };
    const textPart = { text: prompt };
    return callGeminiForInstantScore(prompt, { parts: [textPart, imagePart] });
};

export const compareProfileAndResume = async (file: FileData, data: CompareData): Promise<InstantScoreResult> => {
    const prompt = createInstantScorePrompt("LinkedIn Profile", data.profileText, data, "The user has also provided a resume document for comparison.");
     const imagePart = {
        inlineData: {
            mimeType: file.mimeType,
            data: file.base64,
        },
    };
    const textPart = { text: prompt };
    return callGeminiForInstantScore(prompt, { parts: [textPart, imagePart] });
};

export const getJobMatchAnalysis = async (
    resumeOrProfile: { text?: string; file?: FileData },
    jobDescription: string,
    targetRole: string
): Promise<JobMatchAnalysisResult> => {
    const prompt = `
        You are a professional Resume & Job Match Analyzer. Given a job description (JD) and resume/LinkedIn content, produce a detailed analysis.
        Target Role: ${targetRole}

        **Job Description:**
        ---
        ${jobDescription}
        ---

        **Candidate's Resume/Profile Content:**
        ---
        ${resumeOrProfile.text || "(Content provided in attached document)"}
        ---

        **Your Tasks (return in a single JSON object):**
        1.  **overallScore**: Calculate a match score (0-100) using these weights: Headline/Title 10%, Summary 20%, Work Experience 30%, Skills/Keywords 30%, Formatting/Completeness 10%.
        2.  **sections**: Provide scores (weighted value, e.g. out of 30) and a 1-2 sentence explanation for each of the 5 sections.
        3.  **missingKeywords**: A prioritized list of the top 15 missing keywords from the JD, categorized as 'MUST' or 'NICE-TO-HAVE'.
        4.  **suggestions**: 3 high-impact suggestions for each section (headline, summary, experience, skills), each with an 'impact' (1-5) and 'ease' (1-5) rating.
        5.  **optimizedContent**:
            -   'headlines': 3 optimized headline options (<= 120 characters).
            -   'summaries': 3 summary variants (short, medium, long).
            -   'experienceBullets': 6 achievement-oriented experience bullets rewritten from the user's content to match the JD.
        6.  **keywordPlacements**: Specific instructions on where to place each missing keyword (e.g., headline, summary, skills section).
        7.  **atsReadiness**: A list of checks on ATS compatibility (e.g., Contact Info Present, Standard Headers, File Format, Length), each with a 'Pass', 'Fail', or 'Warn' status and a recommendation.
    `;
    
    let contents: any = prompt;

    if (resumeOrProfile.file) {
        const filePart = {
            inlineData: {
                mimeType: resumeOrProfile.file.mimeType,
                data: resumeOrProfile.file.base64,
            },
        };
        contents = { parts: [{text: prompt}, filePart] };
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                responseMimeType: "application/json",
                responseSchema: jobMatchAnalysisSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as JobMatchAnalysisResult;

    } catch (error) {
        console.error("Error analyzing job match with Gemini API:", error);
        throw new Error("Failed to get job match analysis from the AI. The model may have returned an invalid format. Please check the console for details.");
    }
};


export const generateContentStrategy = async (data: ContentStrategyInput): Promise<ContentStrategyResult> => {
    const prompt = `
        You are an AI LinkedIn Content Strategist & Post Writer.
        
        **User Inputs:**
        - **Industry / Niche:** ${data.industry}
        - **Target Audience:** ${data.audience}
        - **Personal Brand Goal:** ${data.goal}
        - **Style Preference:** ${data.style}

        **Your Tasks:**
        1.  **contentCalendar:** Create a 30-day LinkedIn content calendar with a mix of post types (e.g., educational, storytelling, authority building, polls, carousels).
        2.  **trendingTopics:** Suggest 5 trending and high-engagement topics for the given industry/niche.
        3.  **postDrafts:** Write at least 3 full LinkedIn post drafts (200–400 words each) with a hook, body, CTA, and 3-6 relevant hashtags per post.
        4.  **engagementTips:** Recommend best posting times and engagement strategies to maximize reach.

        Format the entire output as a single JSON object that adheres strictly to the provided schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: contentStrategySchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ContentStrategyResult;

    } catch (error) {
        console.error("Error generating content strategy with Gemini API:", error);
        throw new Error("Failed to generate content strategy from the AI. Please check the console for details.");
    }
};

export const generateKeywordStrategy = async (data: KeywordResearchInput): Promise<KeywordResearchResult> => {
    const prompt = `
        You are an AI Keyword Research & SEO Strategy Assistant.
        
        **User Inputs:**
        - **Primary Keyword / Topic:** "${data.primaryKeyword}"
        - **Target Audience:** ${data.audience}
        - **Goal:** ${data.goal}

        **Your Tasks (return in a single JSON object):**
        1.  **keywordList:** Generate a list of 20-30 related keyword ideas (long-tail, medium-tail, short-tail). For each, provide estimated Search Volume ('Low', 'Medium', 'High'), Keyword Difficulty ('Easy', 'Medium', 'Hard'), user intent (e.g., informational, transactional, job-search, professional branding), and a suggested use (e.g., resume, LinkedIn headline, blog post).
        2.  **topKeywords:** From the list, highlight the Top 10 High-Impact Keywords (best combination of volume and low difficulty).
        3.  **titleSuggestions:** Suggest 3-5 optimized titles or headlines using the top keywords.
        4.  **contentOutline:** Create an SEO-friendly content outline for the primary keyword. It must have one H1, several H2s, and some H3s under the H2s.
        5.  **hashtags:** Suggest relevant hashtags for LinkedIn or Twitter.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: keywordResearchSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as KeywordResearchResult;

    } catch (error) {
        console.error("Error generating keyword strategy with Gemini API:", error);
        throw new Error("Failed to generate keyword strategy from the AI. Please check the console for details.");
    }
};

export const generateHashtagStrategy = async (data: HashtagStrategyInput): Promise<HashtagStrategyResult> => {
    const prompt = `
        You are an AI Hashtag Research & Growth Assistant. Your role is to generate hashtags that maximize reach, engagement, and discoverability.

        **User Inputs:**
        - **Topic / Niche:** "${data.topic}"
        - **Target Platform:** ${data.platform}
        - **Audience Goal:** ${data.audienceGoal}
        - **Content Type:** ${data.contentType}

        **Your Tasks (return in a single JSON object):**
        1.  **fullHashtagList:** Generate 25-40 relevant hashtags. Categorize them into 'highReach' (broad, trending), 'mediumCompetition' (balanced), and 'niche' (specific, long-tail).
        2.  **topHashtags:** From the full list, identify the Top 10 Recommended Hashtags that best fit the user's inputs.
        3.  **postingStrategy:** Provide a strategy for the chosen platform, including 'howMany' hashtags to use, the best 'combination' of types, and where to place them ('placement').
        4.  **emergingHashtags:** Suggest a few new, emerging, or low-competition hashtags in the niche for better visibility.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: hashtagStrategySchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as HashtagStrategyResult;

    } catch (error) {
        console.error("Error generating hashtag strategy with Gemini API:", error);
        throw new Error("Failed to generate hashtag strategy from the AI. Please check the console for details.");
    }
};