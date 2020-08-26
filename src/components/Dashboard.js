import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import NavBar from "./NavBar";
import NotFound from "./NotFound";
import Sidebar from "./Sidebar";
import Question from "./Questions";
import Leaderboard from "./Leaderboard";
import Users from "./Users";

import { refreshQuestion, refreshBoard, refreshKillswitch } from "../utils/questions";
import { refreshUsers } from "../utils/users";

const { Header, Content } = Layout;

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        refreshQuestion().then(dispatch);
        refreshUsers().then(dispatch);
        refreshBoard().then(dispatch);
        refreshKillswitch().then(dispatch);
    }, [dispatch])
    
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header className="header-styling">
                <NavBar />
            </Header>
            <Layout>
                <Sidebar />
                <Layout>
                    <Content style={{ padding: "20px 50px", marginTop: 64 }}>
                        <Switch>
                            <Route exact path="/" component={Question} />
                            <Route exact path="/board" component={Leaderboard} />
                            <Route exact path="/users" component={Users} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}