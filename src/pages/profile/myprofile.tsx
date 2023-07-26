import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function Profile() {
  //create url with upImage
  const { data: session, update }: any = useSession();
  const [upImage, setUpImage] = useState<any>(session && session?.user?.url);
  const [edit, setEdit] = useState(false);
  const [area, setArea] = useState("");
  useEffect(() => {
    setUpImage(session?.user?.url);
    setArea(session?.user?.description);
  }, [session?.user]);

  const updateDescription = async () => {
    console.log(area);
    setEdit(false);
    const response = await fetch(
      `/api/auth/users?id=${session?.user?._id}&description=${area}`
    );
    const result = await response.json();
    update({
      ...session,
      user: {
        ...session?.user,
        description: area,
      },
    });
  };

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "3rem",
              padding: "2rem",
              borderRadius: "3rem",
              width: "auto",
              maxWidth: "80%",
              minWidth: "50%",
              backgroundColor: "#16181A",
            }}
          >
            <label
              htmlFor="input-file"
              style={{
                cursor: "pointer",
              }}
              // create style with onMouseOver
            >
              <img
                onMouseOver={(e: any) => {
                  e.target.style.border = "4px solid #9750dd";
                  e.target.style.transition = "0.5s";
                  e.target.style.boxShadow = "0px 0px 10px #9750dd";
                }}
                onMouseOut={(e: any) => {
                  e.target.style.border = "4px solid blue";
                  e.target.style.transition = "0.5s";
                  e.target.style.boxShadow = "none";
                }}
                src={
                  session.user.url
                    ? upImage
                    : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
                }
                alt="user"
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "6rem",
                  border: "4px solid blue",

                  objectFit: "cover",
                  marginRight: "2rem",
                }}
              />
            </label>
            <input
              id="input-file"
              style={{
                display: "none",
              }}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={uploadImage}
            />

            <div>
              <h1 style={{ width: "100%" }}>
                {session.user.name} {session.user.lastName}
              </h1>
              <div
                style={{
                  wordBreak: "break-word",
                }}
              >
                {!edit &&
                  (session.user.description ? (
                    <p>
                      {session.user.description} {"  "}
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setEdit(true);
                        }}
                        src="/icons/edit.svg"
                      />
                    </p>
                  ) : (
                    <p style={{ color: "gray" }}>
                      User no have a description{"  "}
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setEdit(true);
                        }}
                        src="/icons/edit.svg"
                      />
                    </p>
                  ))}
              </div>
              {edit && (
                <>
                  <div>
                    <textarea
                      style={{
                        borderRadius: "2rem",
                        padding: "10px",
                        border: "1px",
                      }}
                      rows={3}
                      cols={30}
                      value={area}
                      name="description"
                      onChange={(e) => {
                        setArea(e.target.value);
                      }}
                      placeholder="Description"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      rounded
                      flat
                      auto
                      color={"secondary"}
                      onClick={updateDescription}
                    >
                      Ready
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      ) : (
        <h1>Log in to view your profile</h1>
      )}
    </>
  );
}
