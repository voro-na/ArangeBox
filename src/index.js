import { createView } from "./app/createView.js";
import { createModel } from "./app/createModel.js";
import { createViewModel } from "./app/createViewModel.js";

const store = createModel();
const view = createView();
const viewModel = createViewModel(store);



viewModel.bindRenderInitApp(view.RenderInitApp);
viewModel.bindRenderControl(view.renderControl);

view.RenderInitApp();
viewModel.init()

view.onClick(viewModel.bindOnClick);
view.onResetClick(viewModel.bindOnResetClick)
