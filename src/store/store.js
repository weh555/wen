// 不使用vue而使用store状态管理

export const store = {
  state: {
    eSelectLayers: [
    ],
    eMap: null,
  },
  addSelectLayer(layer) {
    this.state.eSelectLayers.push(layer)
  },
  removeSelectLayer(layerName) {
    const index = this.state.eSelectLayers.findIndex(item => item.id == layerName);
    if (index !== -1) {
      this.state.eSelectLayers.splice(index, 1);
    }
  }
}