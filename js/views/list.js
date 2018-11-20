var dialog = document.getElementById("new-bill-dialog");
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

function listView(state) {
  if (state.billList.length === 0) {
    return emptyListPlaceholder();
  }
  let html = state.billList.reduce(function(list, item) {
    return list + listItemView(item);
  }, "");
  return `
        ${html}
      <div class="add-button">
        <a
          onclick=" dialog.showModal()"
          class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        >
          <i class="material-icons">add</i>
        </a>
      </div>
      `;
}

function emptyListPlaceholder() {
  return `
        <div class="demo-card-wide mdl-card mdl-shadow--2dp list-element no-bills-found">
            No bills found. To add more click the 'plus' button.
        </div>
        <div class="add-button">
        <a
          onclick=" dialog.showModal()"
          class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
        >
          <i class="material-icons">add</i>
        </a>
      </div>
    `;
}

function listItemView(item) {
  let color = item.isSimple ? "lightgreen" : "lightblue";
  return `
    <div data-item-id="${
      item.id
    }" style="background-color: ${color}" class="demo-card-wide mdl-card mdl-shadow--2dp list-element">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">${item.name}</h2>
      </div>

      <div class="mdl-card__menu">
        <button
          data-item-id="${item.id}"
          class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect remove-bill-button"
        >
          <a class="mdl-list__item-secondary-action"
            ><i class="material-icons">delete</i></a
          >
        </button>
      </div>
    </div>
    `;
}
$(document).on("click", ".list-element", function(e) {
  e.stopPropagation();
  let id = this.attributes["data-item-id"].value;
  navigateToBill(id);
});
$(document).on("click", ".remove-bill-button", function(e) {
  e.stopPropagation();
  let id = this.attributes["data-item-id"].value;
  state.removeBill(id);
});
function createList() {
  let name = document.getElementById("billName").value;
  let bill = new Bill(name);
  $(".qr-code-view").toggleClass("disabled");
  state.addBill(bill);
  navigate("list");
}
function createSimpleList() {
  let name = document.getElementById("billName").value;
  let bill = new Bill(name, true);
  state.addBill(bill);
  navigate("list");
}
function createShareableListView(state) {
  return `
  <div class="demo-card mdl-card mdl-shadow--2dp">
    <h1 class="new-list-modal">Choose a cool name for your bill!</h1>
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="billName">
        <label class="mdl-textfield__label" for="sample3">Text...</label>
        </div>
    </form>
     <button onclick="createList()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        Create
    </button>
  </div>

    `;
}
function createSimpleListView(state) {
  return `
  <div class="demo-card mdl-card mdl-shadow--2dp">
    <h1 class="new-list-modal">Choose a cool name for your bill!</h1>
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="billName">
        <label class="mdl-textfield__label" for="sample3">Text...</label>
        </div>
    </form>
     <button onclick="createSimpleList()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        Create
    </button>
  </div>
    `;
}
