import Message from "@/model/Message";

export default {
  namespaced: true,
  state: {
    messages: [{ id: 1, name: "zhangsan" }]
  },
  mutations: {
    UPDATE_MSG(state: any, messages: Message[]) {
      state.messages = messages;
    }
  },
  actions: {
    list({ state }: any): Message[] {
      return state.messages;
    },
    add({ state, commit }: any, { todo }: { todo: string }) {
      const msgs: Message[] = state.messages;
      msgs.push({
        id: msgs.length + 1,
        name: todo
      });
      commit("UPDATE_MSG", msgs);
    },
    delete({ state, commit }: any, { id }: { id: number }) {
      const msgs: Message[] = [...state.messages];
      msgs.splice(
        msgs.findIndex(item => item.id === id),
        1
      );
      commit("UPDATE_MSG", msgs);
    }
  }
};
