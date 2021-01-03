import React, { Component } from "react";
import {
  Row,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import {
  getAlts,
  altAdding,
  deleteAlt,
  altEditing,
} from "../actions/alternativeActions";
import {
  getCrits,
  critAdding,
  deleteCrit,
  critEditing,
} from "../actions/criteriaActions";
import AltAddForm from "./altComponents/AltAddForm";
import AltEditForm from "./altComponents/AltEditForm";
import AltListGroup from "./altComponents/AltListGroup";
import CritAddForm from "./critComponents/CritAddForm";
import CritListGroup from "./critComponents/CritListGroup";
import CritEditForm from "./critComponents/CritEditForm";

class ProjectTable extends Component {
  state = {
    dropdownOpen: false,
  };
  componentDidMount() {
    if (this.props.auth.project) {
      this.props.getAlts(this.props.auth.project);
      this.props.getCrits(this.props.auth.project);
    }
  }
  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  onAltDeleteClick = (id) => {
    this.props.deleteAlt(id);
  };
  onAltEditClick = (id) => {
    this.props.altEditing(id);
  };
  onAltAddClick = () => {
    this.props.altAdding();
  };
  onCritDeleteClick = (id) => {
    this.props.deleteCrit(id);
  };
  onCritEditClick = (id) => {
    this.props.critEditing(id);
  };
  onCritAddClick = () => {
    this.props.critAdding();
  };
  render() {
    const {
      alts,
      altediting,
      altadding,
      selectedalt,
      altloading,
    } = this.props.alternative;
    const {
      crits,
      critediting,
      critadding,
      selectedcrit,
      critloading,
    } = this.props.criteria;
    return (
      <div>
        <Row>
          <ButtonToolbar>
            <ButtonGroup>
              <Button outline color="secondary" onClick={this.onCritAddClick}>
                K+
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button outline color="secondary" onClick={this.onAltAddClick}>
                A+
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button outline color="secondary">
                5
              </Button>
              <Button outline color="secondary">
                6
              </Button>
              <Button outline color="secondary">
                7
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret outline color="secondary">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Dropdown Link</DropdownItem>
                  <DropdownItem>Dropdown Link</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
        {altadding ? (
          <Row>
            <AltAddForm />
          </Row>
        ) : null}
        {critadding ? (
          <Row>
            <CritAddForm />
          </Row>
        ) : null}
        {altloading || critloading ? (
          <Row>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <h3 className="ml-3"> Loading...</h3>
          </Row>
        ) : (
          <Row>
            <Table bordered className="mt-3">
              <thead>
                <tr>
                  <th>Kriter Adı</th>
                  {crits !== null
                    ? crits.map((crit) => (
                        <th scope="row">
                          {critediting && selectedcrit._id === crit._id ? (
                            <CritEditForm crit={crit} />
                          ) : (
                            <CritListGroup
                              crit={crit}
                              onDeleteClick={this.onCritDeleteClick}
                              onEditClick={this.onCritEditClick}
                            />
                          )}
                        </th>
                      ))
                    : null}
                </tr>
              </thead>
              <tbody>
                {alts !== null
                  ? alts.map((alt) => (
                      <tr>
                        <th scope="row">
                          {altediting && selectedalt._id === alt._id ? (
                            <AltEditForm alt={alt} />
                          ) : (
                            <AltListGroup
                              alt={alt}
                              onDeleteClick={this.onAltDeleteClick}
                              onEditClick={this.onAltEditClick}
                            />
                          )}
                        </th>
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Row>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  alternative: state.alternative,
  criteria: state.criteria,
});

export default connect(mapStateToProps, {
  getAlts,
  altAdding,
  deleteAlt,
  altEditing,
  getCrits,
  critAdding,
  deleteCrit,
  critEditing,
})(ProjectTable);
