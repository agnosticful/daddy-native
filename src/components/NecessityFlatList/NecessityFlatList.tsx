import * as React from "react";
import { Component } from "react";
import { FlatList, ViewProps } from "react-native";
import { NecessityList } from "../../domains";
import { NecessityRepository } from "../../services";
import NecessityRepositoryContext from "../NecessityRepositoryContext";
import NecessityFlatListItem from "./NecessityFlatListItem";

interface Props extends ViewProps {
  // FIXME: hack to pass a context value in the Expo v32
  // See: https://github.com/agnosticful/daddy-native/issues/6
  necessityRepository: NecessityRepository;
}

interface State {
  necessityList: NecessityList | null;
  isRefreshing: boolean;
}

class NecessityFlatList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { necessityList: null, isRefreshing: false };
  }

  async componentDidMount() {
    const necessityList = await this.props.necessityRepository.getPrimaryNecessityList();

    this.setState({ necessityList });
  }

  render() {
    if (this.state.necessityList === null) {
      return null;
    }

    return (
      <FlatList
        data={this.state.necessityList.necessities}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => (
          <NecessityFlatListItem
            necessity={item}
            onDeleteRequested={() => {
              this.setState({
                necessityList: this.state.necessityList!.delete(item)
              });
            }}
          />
        )}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isRefreshing}
      />
    );
  }

  private onRefresh() {
    this.setState({ isRefreshing: true });

    setTimeout(async () => {
      const necessityList = await this.props.necessityRepository.getPrimaryNecessityList();

      this.setState({ necessityList, isRefreshing: false });
    }, 1000);
  }
}

// FIXME: hack to pass a context value in the Expo v32
// See: https://github.com/agnosticful/daddy-native/issues/6
function ContextProvider({ ...props }: ViewProps) {
  return (
    <NecessityRepositoryContext.Consumer>
      {necessityRepository => (
        <NecessityFlatList
          necessityRepository={necessityRepository}
          {...props}
        />
      )}
    </NecessityRepositoryContext.Consumer>
  );
}

export default ContextProvider;
