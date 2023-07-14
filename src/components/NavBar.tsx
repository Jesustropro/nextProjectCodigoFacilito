import { Navbar, Link, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const { data: session } = useSession();
  const collapseItems = [
    "Random",
    "Wisdom",
    "Friendship",
    "Inspirational",
    "Humorous",
    "History",
    "Philosophy",
    "Love",
  ];

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
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
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link
          isActive={id === undefined}
          onClick={() => router.push("/")}
        >
          Random
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
                src="https://paperboogie.com/wp-content/uploads/2020/11/como-ordeno-mis-libros-150x150.jpg"
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
                item !== "Random"
                  ? router.push(`/category/${item}`)
                  : router.push("/");
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
