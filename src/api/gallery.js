import client from "./client";

export async function fetchGalleryImages() {
    const res = await client.get("/gallery-images/");
    return res.data; // [{id, image_url}]
}

export async function fetchVideos() {
    const res = await client.get("/videos/");
    return res.data; // [{id, video_url}]
}
