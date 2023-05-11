// reactstrap components
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

export default function Login() {
  const [form, setForm] = useState({});
  const { keycloak, initialized } = useKeycloak();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await keycloak.login();
      console.log(res);
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Row
          style={{
            width: 400,
          }}
        >
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">Login</h5>
              </CardHeader>
              <CardBody>
                <Form onChange={handleChange}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          name="email"
                          placeholder="johndoe@trial.co"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="*********"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={handleLogin}
                  className="btn-fill"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
