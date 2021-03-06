import * as qs from "qs";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import actions from "../../actions";
import Catalog from "../../components/Catalog";
import { IStoreState } from "../../shared/types";

function mapStateToProps(
  { charts, operators, namespace, config }: IStoreState,
  { match: { params }, location }: RouteComponentProps<{ repo: string }>,
) {
  return {
    charts,
    filter: qs.parse(location.search, { ignoreQueryPrefix: true }).q || "",
    repo: params.repo,
    csvs: operators.csvs,
    namespace: namespace.current,
    featureFlags: config.featureFlags,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, Action>) {
  return {
    fetchCharts: (repo: string) => dispatch(actions.charts.fetchCharts(repo)),
    pushSearchFilter: (filter: string) => dispatch(actions.shared.pushSearchFilter(filter)),
    getCSVs: (namespace: string) => dispatch(actions.operators.getCSVs(namespace)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
