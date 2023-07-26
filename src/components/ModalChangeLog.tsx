import { Modal, Button, Text } from "@nextui-org/react";
import { useState } from "react";
export default function ModalChangeLog() {
  const [visible, setVisible] = useState(true);

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
          v0.7.4-beta changelog
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text id="modal-description">
          Dear user, thank you for being part of the beta of this project!
          <br />
          <br />
          Releases: <br />
          <ul style={{ listStyleType: "circle" }}>
            <li>
              v0.7.4
              <ul style={{ listStyleType: "circle" }}>
                <li>Now you can add a description to your profile!</li>
                <li>
                  In the user category, if you enter someones profile, you can
                  see their profile picture, their description, their quotes and
                  likes
                </li>
              </ul>
            </li>
            <li>
              v0.7.2
              <ul style={{ listStyleType: "circle" }}>
                <li>Now you can customize your profile picture!</li>
                <li>
                  Now the quotes created by users will show their profile
                  picture
                </li>
              </ul>
            </li>
            <li>
              v0.6.1
              <ul style={{ listStyleType: "circle" }}>
                <li>Now the quotes you write can be seen by other users!</li>
                <li> Fixed a bug that did not allow saving the likes</li>
                <li>Now you can create your own quotes!</li>
                <li>Now you can see quotes by author!</li>
              </ul>
            </li>
            <li>
              v0.5.2
              <ul style={{ listStyleType: "circle" }}>
                <li>Now the likes accumulate and are visible!</li>
                <li>
                  New top! quotes and authors will now be highlighted in the
                  home
                </li>
              </ul>
            </li>
          </ul>
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
