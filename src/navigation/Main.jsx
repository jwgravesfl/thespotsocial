import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";

import LandingPage from "../components/LandingPage";
import Login from "../components/authentication/Login";

// Protected Routes
import CommentSection from "../components/CommentSection";
import SpotSection from "../components/spotComponents/SpotSection";
import NoteSection from "../components/theSpotMarketing/SpotSection";

import { getUser } from "../actions/userAction";
import { connect } from "react-redux";
import { AuthenticatedComponent } from "../components/authentication/AuthenticatedComponent";

import LoadingComponent from "../components/LoadingComponent";

export class Main extends Component {
  componentDidMount = () => {
    this.props.getUser();
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="mainViewer">
            <NavBar />
            <LoadingComponent>
              <Switch>
                <Route path="/" component={LandingPage} exact={true} />
                <Route path="/login" component={Login} exact={true} />
                <AuthenticatedComponent user={this.props.user}>
                  <Route
                    path="/commentSection"
                    component={CommentSection}
                    exact={true}
                  />
                  <Route
                    path="/spotSection"
                    component={SpotSection}
                    exact={true}
                  />
                  <Route
                    path="/notesSection"
                    component={NoteSection}
                    exact={true}
                  />
                </AuthenticatedComponent>
              </Switch>
            </LoadingComponent>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
