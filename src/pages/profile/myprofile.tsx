import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Loading } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function Profile() {
  //create url with upImage

  const { theme } = useTheme();
  const [themeValue, setThemeValue] = useState<any>(null);
  const { data: session, update }: any = useSession();
  const [upImage, setUpImage] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [area, setArea] = useState("");
  const [id, setId] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  useEffect(() => {
    setThemeValue(theme);
  }, [theme]);
  useEffect(() => {
    setLoading(true);
    setId(session?.user?._id);
    if (id) {
      const fetchQuotes = async () => {
        const res = await fetch(`/api/auth/createquote?creatorId=${id}`);
        const data: [] = await res.json();
        setUser(...data, null);

        if (user) {
          update({
            ...session,
            user: {
              ...session?.user,
              url: user?.url,
            },
          });
        }
        setLoading(false);
        setLoadingImage(false);
      };

      fetchQuotes();
    }

    setArea(user?.description);
  }, [session?.user?._id, id, upImage, user?.description, edit]);

  const updateDescription = async () => {
    const response = await fetch(
      `/api/auth/users?id=${session?.user?._id}&description=${area}`
    );
    const result = await response.json();
    setEdit(false);
  };

  const uploadImage = async (e: any) => {
    setLoadingImage(true);
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

    const response = await fetch(
      `/api/auth/users?id=${session?.user?._id}&url=${fileUrl.secure_url}`
    );
    const result = await response.json();
    setUpImage(fileUrl.secure_url);
  };
  return (
    <>
      {user ? (
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
              backgroundColor: themeValue === "dark" ? "#16181A " : "#C8AE7D",
            }}
          >
            <label
              htmlFor="input-file"
              style={{
                cursor: "pointer",
              }}
              // create style with onMouseOver
            >
              {!loadingImage ? (
                <img
                  onMouseOver={(e: any) => {
                    if (themeValue === "dark") {
                      e.target.style.border = "4px solid #9750dd";
                      e.target.style.transition = "0.5s";
                      e.target.style.boxShadow = "0px 0px 10px #9750dd";
                    } else {
                      e.target.style.border = "4px solid #65451F";
                      e.target.style.transition = "0.5s";
                      e.target.style.boxShadow = "0px 0px 15px #65451F";
                    }
                  }}
                  onMouseOut={(e: any) => {
                    if (themeValue === "dark") {
                      e.target.style.border = "4px solid blue";
                      e.target.style.transition = "0.5s";
                      e.target.style.boxShadow = "none";
                    } else {
                      e.target.style.border = "4px solid #65451F";
                      e.target.style.transition = "0.5s";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                  src={
                    user && user?.url
                      ? user.url
                      : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
                  }
                  alt="user"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "6rem",
                    border:
                      themeValue === "dark"
                        ? "4px solid blue"
                        : "4px solid #65451F",

                    objectFit: "cover",
                    marginRight: "2rem",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "6rem",
                    border: "4px solid blue",
                    marginRight: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Loading color={"secondary"} size="xl" />
                  </div>
                </div>
              )}
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
                  (user?.description ? (
                    <p>
                      {user?.description} {"  "}
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
      ) : session && !user && loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <Loading color={"secondary"} size="xl" />
        </div>
      ) : (
        !user && !session && <h1>Log in to view your profile</h1>
      )}
    </>
  );
}
