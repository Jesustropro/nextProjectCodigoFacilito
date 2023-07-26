import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  //create url with upImage
  const { data: session, update }: any = useSession();
  const [upImage, setUpImage] = useState<any>(session && session?.user?.url);

  useEffect(() => {
    setUpImage(session?.user?.url);
  }, [session?.user?.url]);
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "lmh1brnv");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duqxyxnql/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const fileUrl = await res.json();

    setUpImage(fileUrl.secure_url);
    const response = await fetch(
      `/api/auth/users?id=${session?.user?._id}&url=${fileUrl.secure_url}`
    );
    const result = await response.json();

    //update session
    update({
      ...session,
      user: {
        ...session?.user,
        url: fileUrl.secure_url,
      },
    });
  };
  return (
    <>
      {session ? (
        <>
          <div>
            <img
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                borderRadius: "6rem",
                border: "4px solid blue",
                objectFit: "cover",
              }}
              alt="profile"
              src={
                session.user.url
                  ? upImage
                  : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
              }
            />
            <input
              style={{
                position: "absolute",
                opacity: "0",
                left: "23px",
                top: "50%",
              }}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={uploadImage}
            />
          </div>
          <h1>{session?.user?.name}</h1>
        </>
      ) : (
        <h1>Log in to view your profile</h1>
      )}
    </>
  );
}
