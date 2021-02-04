import React from "react";
import { Form, Col, Container, Button, Spinner } from "react-bootstrap";
import ShowJobs from "./ShowJobs";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getJobsWithThunk: (url) => {
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          dispatch({
            type: "GET_JOBS",
            payload: data,
          });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: "Something went wrong",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
});

class Home extends React.Component {
  state = {
    loading: false,
    addSearchOptions: {
      description: "backend",
      location: "berlin",
    },
  };

  updateCommentField = (e) => {
    let addSearchOptions = { ...this.state.addSearchOptions };
    let currentId = e.currentTarget.id;

    addSearchOptions[currentId] = e.currentTarget.value;

    this.setState({ addSearchOptions });
  };

  fetchJobs = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let url = `/positions.json?description=${this.state.addSearchOptions.description}&location=${this.state.addSearchOptions.location}`;
    await this.props.getJobsWithThunk(url);

    this.setState({
      ...this.state,
      addSearchOptions: {
        description: "",
        location: "",
      },
      loading: false,
    });
  };

  render() {
    const jobs = this.props.jobs.arrJobs || [];
    return (
      <>
        <Container className="my-5">
          <Form onSubmit={this.fetchJobs}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  type="text"
                  id="description"
                  placeholder="Enter job description"
                  value={this.state.addSearchOptions.description}
                  onChange={this.updateCommentField}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  id="location"
                  placeholder="Enter location"
                  value={this.state.addSearchOptions.location}
                  onChange={this.updateCommentField}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                className="ml-3 mt-3"
                style={{ height: "50%", alignSelf: "center" }}
              >
                Search
              </Button>
            </Form.Row>
          </Form>

          {this.state.loading ? (
            <div className="d-flex justify-content-center mt-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            jobs.length > 0 && <ShowJobs history={this.props.history} />
          )}
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
