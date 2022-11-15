import React from 'react';
import AppLocale from "../lang";
import { useEffect } from "react";
import { connect } from "react-redux";
import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";
import AppLayout from "../layouts/app-layout";
import AuthLayout from '../layouts/auth-layout';
import useBodyClass from '../hooks/useBodyClass';
import { setAuthUser } from '../redux/actions/Auth';
import { Route, Switch, withRouter } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH, ROOT } from '../configs/AppConfig';

export const Views = (props) => {
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  useEffect(() => {
    findLoggedUser();
  });

  const findLoggedUser = async () => {
    try {
      await props.setAuthUser(() => { });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location} />
          </Route>
          <Route exact path={ROOT}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } = theme;
  const { token } = auth;
  return { locale, token, direction }
};

export default withRouter(connect(mapStateToProps, { setAuthUser })(Views));