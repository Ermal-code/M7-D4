import React from "react";
import Job from "./Job";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

class ShowJobs extends React.Component {
  render() {
    const jobs = this.props.jobs.arrJobs;
    return (
      <div className="mt-4 border-top border-secondary">
        <h2 className="my-3">Showing {this.props.jobs.length} jobs</h2>
        <hr />
        {jobs &&
          jobs.map((job, index) => (
            <div key={index}>
              <Job
                // addJob={this.props.addJob}
                theJob={job}
                history={this.props.history}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ShowJobs);
