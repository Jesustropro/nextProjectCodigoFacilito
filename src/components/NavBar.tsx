import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import NextLink from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  const collapseItems = [
    "Cuenta",
    "Favoritos",
    "Ayuda y comentarios",
    "Cerrar sesión",
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
        <Text b color="inherit" hideIn="xs">
          BuscaTuViaje
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="xs"
        variant="highlight-rounded"
      >
        <Navbar.Link isActive href="#">
          Ofertas
        </Navbar.Link>
        <Navbar.Link href="#">Nacionales</Navbar.Link>
        <Navbar.Link href="#">Internacionales</Navbar.Link>
        <Navbar.Link href="#">Nosotros</Navbar.Link>
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
                  {`¡Hola ${session.user.name}!`}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Mis favoritos
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                <div onClick={() => signOut()}>Cerrar sesión</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          ) : (
            <Dropdown.Menu aria-label="User menu actions" color="secondary">
              <Dropdown.Item key="signup" color="success">
                <div onClick={() => signIn()}>Iniciar sesión</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
