import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";

import Login from "../components/Login";

const { Content } = Layout;

const NotFoundSplash = () => <NotFound mode="splash" />;

export default function Spash() {
    return (
        <Content>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route component={NotFoundSplash} />
            </Switch>
        </Content>
    )
}