import client from "./client";

export async function fetchPromotions() {
    const res = await client.get("/promotions/");
    return res.data; // [{id, image_url, link}]
}
