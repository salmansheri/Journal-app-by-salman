export async function getPixabayImage(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${process.env.PIXABAY_URL}/${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();
    console.log(data);

    return data.hits[0]?.largeImageUrl || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
