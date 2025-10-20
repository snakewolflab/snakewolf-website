
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const imagePath = path.join(process.cwd(), 'src', 'app', 'character', id);

  try {
    const imageBuffer = await fs.readFile(imagePath);
    const fileExtension = path.extname(imagePath).slice(1);
    
    // Determine content type based on file extension
    let contentType = 'image/jpeg'; // default
    if (fileExtension === 'png') {
        contentType = 'image/png';
    } else if (fileExtension === 'gif') {
        contentType = 'image/gif';
    } else if (fileExtension === 'svg') {
        contentType = 'image/svg+xml';
    }

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading image file:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}
