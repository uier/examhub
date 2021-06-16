import {
  createStore,
  GetterTree,
  MutationTree,
  ActionContext,
  ActionTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from 'vuex';
import { MutationTypes, ActionTypes } from './types';
import api from '../api';

// ---------- State
export type State = {
  user: User.Info | null
}

const state: State = {
  user: null,
};

// ---------- Getter
export type Getters = {

};

export const getters: GetterTree<State, State> & Getters = {

};

// ---------- Mutation
export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, payload: State['user']): void;
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER](state, payload) {
    state.user = payload;
  },
};

// ---------- Action
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.GET_USER]({ commit }: AugmentedActionContext): void;
  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext): void;
}

const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_USER]({ commit }) {
    try {
      const { data } = await api.Users.getMe();
      commit(MutationTypes.SET_USER, data);
    } catch (error) {
      commit(MutationTypes.SET_USER, null);
    }
  },
  async [ActionTypes.LOGOUT]({ commit }) {
    await api.Auth.logout();
    commit(MutationTypes.SET_USER, null);
  },
};

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  plugins: [createLogger()],
});

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore(): Store {
  return store as Store;
}
