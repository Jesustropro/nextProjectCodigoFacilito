import { Navbar, Link, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function NavBar() {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();
  const { data: session }: any = useSession();

  const collapseItems = [
    "Quotes Of The Day",
    "Wisdom",
    "Friendship",
    "Inspirational",
    "Humorous",
    "History",
    "Philosophy",
    "Love",
    "Motivational",
    "Users",
  ];

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle id={"toggle"} showIn="sm" />
      <Navbar.Brand
        css={{
          "@sm": {
            w: "12%",
          },
        }}
      >
        <Text
          onClick={() => router.push("/")}
          b
          color="inherit"
          style={{ cursor: "pointer" }}
        >
          YouReadIt?
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="sm"
        variant="highlight-rounded"
      >
        <Navbar.Link
          isActive={id === undefined}
          onClick={() => router.push("/")}
        >
          Quotes Of The Day
        </Navbar.Link>
        <Navbar.Link
          isActive={id === "wisdom"}
          onClick={() => router.push("/category/wisdom")}
        >
          Wisdom
        </Navbar.Link>
        <Navbar.Link
          isActive={id === "friendship"}
          onClick={() => router.push("/category/friendship")}
        >
          Friendship
        </Navbar.Link>
        <Navbar.Link
          isActive={id === "inspirational"}
          onClick={() => router.push("/category/inspirational")}
        >
          Inspirational
        </Navbar.Link>
        <Navbar.Link
          isActive={id === "love"}
          onClick={() => router.push("/category/love")}
        >
          Love
        </Navbar.Link>
        <Navbar.Link
          isActive={id === "users"}
          onClick={() => router.push("/category/users")}
        >
          Users
        </Navbar.Link>
      </Navbar.Content>

      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                src={
                  session?.user?.url
                    ? session?.user?.url
                    : "https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
                }
              />
            </Dropdown.Trigger>
          </Navbar.Item>

          {session ? (
            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text
                  onClick={() => router.push("/")}
                  b
                  color="inherit"
                  css={{ d: "flex" }}
                >
                  {`¡Hello ${session?.user?.name}!`}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="favorites" withDivider>
                <Navbar.Link onClick={() => router.push("/favorites")}>
                  Favorites
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item key="myquotes" withDivider>
                <Navbar.Link onClick={() => router.push("/myquotes")}>
                  My quotes
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item key="myprofile" withDivider>
                <Navbar.Link onClick={() => router.push("/profile/myprofile")}>
                  Profile
                </Navbar.Link>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                <div onClick={() => signOut()}>Log Out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item key="signup" color="success">
                <div onClick={() => router.push("/auth/login")}>Sign In</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </Navbar.Content>

      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item + index}
            activeColor="secondary"
            isActive={id !== undefined ? item === id : index === 0}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              onClick={() => {
                item !== "Quotes Of The Day"
                  ? router.push(`/category/${item}`)
                  : router.push("/");
                document.getElementById("toggle")?.click();
              }}
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
