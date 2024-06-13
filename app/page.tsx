import { FileUpload } from "./components/FileUpload";

/* Next.js server actions with Deno */
export default async function Home() {
  async function action(formData: FormData) {
    "use server";
 
    const file = formData.get("file") as File;
    if (!file) return { message: "No file uploaded" };
  
    const stream = await file.stream();
    const out = await Deno.open("file.png", {
      write: true,
      create: true,
    });
    await stream.pipeTo(out.writable);
    console.log("File saved to ./file.png");
  }

  return (
    <form className="m-20" action={action}>
      <FileUpload />
      <button 
        type="submit"
        className="w-full rounded-none btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}

