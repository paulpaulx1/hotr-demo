// src/app/api/bulletins/route.js
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { NextResponse } from "next/server";

// Sanity client configuration
const client = createClient({
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-10-25", // Use current date
  useCdn: process.env.NODE_ENV === "production",
});

// Set up the image URL builder
const builder = imageUrlBuilder(client);

// Helper function for generating image URLs
const urlForImage = (source) => {
  return builder.image(source);
};

// GET handler for the App Router API route
export async function GET() {
  try {
    // GROQ query to fetch active bulletins
    const query = `
  *[_type == "bulletin" && isActive == true && (displayUntil > now() || !defined(displayUntil))] 
    | order(displayOrder asc) {
      _id,
      title,
      content,
      image,
      ctaText,
      ctaLink,
      "ctaFileUrl": ctaFile.asset->url,
      displayOrder
    }
`;

    // Fetch bulletins from Sanity
    const bulletins = await client.fetch(query);
    console.log(bulletins);

    // Process the images to include their URLs
    const processedBulletins = bulletins.map((bulletin) => {
      return {
        ...bulletin,
        // Add the full image URL if there's an image
        imageUrl: bulletin.image
          ? urlForImage(bulletin.image).width(800).url()
          : null,
      };
    });

    // Return the bulletins as JSON
    return NextResponse.json(processedBulletins);
  } catch (error) {
    console.error("Error fetching bulletins:", error);
    return NextResponse.json(
      { message: "Error fetching bulletins", error: error.message },
      { status: 500 }
    );
  }
}
