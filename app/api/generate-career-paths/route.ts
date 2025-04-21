import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { interests, skills, values, educationLevel, workHistory } = await req.json();
    
    // For now, returning mock data
    // In a real implementation, this would call an AI service or backend
    const careerPaths = [
      {
        title: "Software Engineer",
        description: "Develop applications and systems using programming languages and software development principles.",
        matchScore: 95,
        skills: ["Programming", "Problem Solving", "Software Design"],
        educationPath: "Bachelor's in Computer Science or related field",
        salaryRange: "$70,000 - $150,000"
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to help organizations make better decisions.",
        matchScore: 88,
        skills: ["Statistics", "Machine Learning", "Data Visualization"],
        educationPath: "Master's in Data Science, Statistics, or related field",
        salaryRange: "$80,000 - $160,000"
      },
      {
        title: "UX Designer",
        description: "Create intuitive, accessible interfaces for digital products and services.",
        matchScore: 82,
        skills: ["User Research", "Wireframing", "Prototyping"],
        educationPath: "Bachelor's in Design, HCI, or related field",
        salaryRange: "$65,000 - $130,000"
      }
    ];
    
    return NextResponse.json({ careerPaths });
  } catch (error) {
    console.error('Error generating career paths:', error);
    return NextResponse.json(
      { error: 'Failed to generate career paths' },
      { status: 500 }
    );
  }
} 