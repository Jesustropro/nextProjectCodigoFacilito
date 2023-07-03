import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Text onClick={() => router.push("/")} b color="inherit" hideIn="xs">
          YouReadIt?
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link onClick={() => router.push("/")}>Random</Navbar.Link>
        <Navbar.Link onClick={() => router.push("/category/wisdom")}>
          Wisdom
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/category/love")}>
          Love
        </Navbar.Link>
        <Navbar.Link onClick={() => router.push("/category/inspirational")}>
          Inspirational
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </Dropdown.Trigger>
          </Navbar.Item>

          {session ? (
            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {`¡Hello ${session?.user?.name}!`}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                <Navbar.Link onClick={() => router.push("/favorites")}>
                  Favorites
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
    </Navbar>
  );
}
