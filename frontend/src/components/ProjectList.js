import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  getProjects,
  deleteProject,
  projectEditing,
  projectAdding,
  unLoadProjects,
} from "../actions/projectActions";
import { selectedProject } from "../actions/authActions";
import PropTypes from "prop-types";
import ProjectEditForm from "./ProjectEditForm";
import ProjectListGroup from "./ProjectListGroup";
import ProjectAddForm from "./ProjectAddForm";

class ProjectList extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getProjects();
    }
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  };

  onEditClick = (id) => {
    this.props.projectEditing(id);
  };
  onAddClick = () => {
    this.props.projectAdding();
  };

  onSelectClick = (id) => {
    //this.props.unLoadProjects();
    this.props.selectedProject(id);
  };

  render() {
    const {
      projects,
      projectediting,
      selectedproject,
      projectadding,
    } = this.props.project;
    return (
      <Container>
        <ListGroup className="mt-3">
          <Button
            color="dark"
            //style={{ marginBottom: "2rem" }}
            onClick={this.onAddClick.bind(this)}
            block
          >
            Add Project
          </Button>
          {projectadding ? (
            <ListGroupItem>
              <ProjectAddForm />
            </ListGroupItem>
          ) : null}

          {projects.map((project) => (
            <ListGroupItem key={project._id}>
              {projectediting && selectedproject._id === project._id ? (
                <ProjectEditForm project={project} />
              ) : (
                <ProjectListGroup
                  project={project}
                  onDeleteClick={this.onDeleteClick}
                  onEditClick={this.onEditClick}
                  onSelectClick={this.onSelectClick}
                />
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProjects,
  deleteProject,
  selectedProject,
  projectEditing,
  projectAdding,
  unLoadProjects,
})(ProjectList);
