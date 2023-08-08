import { Modal, Button, Text, Collapse } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function ModalChangeLog() {
  const [visible, setVisible] = useState(false);
  const { data: session, update }: any = useSession();
  useEffect(() => {
    const modalChangeLog = sessionStorage.getItem("modalChangeLog");
    if (!modalChangeLog) {
      setVisible(true);
      sessionStorage.setItem("modalChangeLog", "true");
    }
  }, [session]);

  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <Modal
      closeButton
      preventClose
      width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          v0.9.1-beta changelog
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">
          Dear user, thank you for being part of the beta of this project!
          <br />
          <br />
          Releases: <br />
          <Collapse.Group shadow>
            <Collapse title="v0.9.1" expanded>
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>You can now toggle between a light and a dark theme</li>
                  <li>Minor design changes, loading screens added</li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.8.4">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    The main page now shows 8 appointments that are updated
                    every 24 hours
                  </li>
                  <li>
                    New refresh button, to read more quotes without reloading
                    the page
                  </li>
                  <li>
                    Now if a user deletes a quote, it will also be removed from
                    any user who has saved it in favorites
                  </li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.8.2">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>Now you can sign up using your google account</li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.8.1">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>Now you can log in using your google account</li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.7.5">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>
                    Now if you are on your phone or tablet you can share the
                    quotes in your favorite apps
                  </li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.7.4">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>Now you can add a description to your profile!</li>
                  <li>
                    In the user category, if you enter someones profile, you can
                    see their profile picture, their description, their quotes
                    and likes
                  </li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.6.1">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>Now the quotes you write can be seen by other users!</li>
                  <li> Fixed a bug that did not allow saving the likes</li>
                  <li>Now you can create your own quotes!</li>
                  <li>Now you can see quotes by author!</li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="v0.5.2">
              <Text>
                <ul style={{ listStyleType: "circle" }}>
                  <li>Now the likes accumulate and are visible!</li>
                  <li>
                    New top! quotes and authors will now be highlighted in the
                    home
                  </li>
                </ul>
              </Text>
            </Collapse>
          </Collapse.Group>
          We appreciate any bugs you can tell us about!
          <br /> Thank you for continuing to use YouReadIt?
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
