import React from "react";
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  showError: () =>
    dispatch({ type: "SET_ERROR", payload: "404: Job not found" }),
});

class Details extends React.Component {
  componentDidMount = () => {
    if (!this.props.jobs.job.hasOwnProperty("title")) {
      this.props.showError();
    }
  };
  render() {
    const job = this.props.jobs.job;
    return (
      <Container className="mt-5">
        {!job.hasOwnProperty("title") ? (
          <Alert variant="danger">{this.props.error}</Alert>
        ) : (
          <>
            <div className="border-top border-dark">
              <h6 className="mt-4" style={{ color: "#abacab" }}>
                {job.type} / {job.location}
              </h6>
              <h2>{job.title}</h2>
            </div>
            <hr />
            <Row className="mt-4">
              <Col md={8}>
                <h4>Job Description</h4>
                <br />
                <div
                  className="descriptionP"
                  dangerouslySetInnerHTML={{
                    __html: job.description,
                  }}
                ></div>

                <h4 className="mt-4">How To Apply</h4>
                <p
                  dangerouslySetInnerHTML={{
                    __html: job.how_to_apply,
                  }}
                ></p>
              </Col>
              <Col md={4}>
                <Card style={{ background: "#eeeeee" }}>
                  <Card.Img variant="top" src={job.company_logo} />
                  <Card.Body>
                    <Card.Title>Company Name: {job.company}</Card.Title>
                    {job.company_url && (
                      <a target="_blank" href={job.company_url}>
                        {job.company_url}
                      </a>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
