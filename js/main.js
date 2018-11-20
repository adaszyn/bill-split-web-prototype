let contentElement = null;
let state = null;

const ERROR_CONTENT = "<h1>Error loading a view";
const VIEWS = {
  home: homeView,
  about: createAboutView,
  list: listView,
  createShareableList: createShareableListView,
  createSimpleList: createSimpleListView,
  bill: createBillView,
  simpleBill: createSimpleBillView
};

function getRandomId() {
  return (
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1) +
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  );
}
function Bill(name, isSimple) {
  this.isSimple = !!isSimple;
  this.name = name;
  this.id = getRandomId();
  this.items = [];
  this.participants = [];
}
Bill.prototype.addItemByParticipantName = function(
  participantName,
  value,
  name
) {
  let participant = this.participants.find(
    participant => participant.name === participantName
  );
  if (!participant) {
    return;
  }
  participant.items.push({
    value: value,
    name: name
  });
  updateCurrentView();
};
Bill.prototype.addParticipant = function(name) {
  this.participants.push({
    name: name,
    items: [],
  })
  updateCurrentView();
}
function ApplicationState() {
  this.billList = [];
  this.selectedBillId = null;
  this.currentView = null;
  this.paymentsAccessible = true;
}
ApplicationState.prototype.removeBill = function(id) {
  this.billList = this.billList.filter(function(item) {
    return item.id !== id;
  });
  updateCurrentView();
};
ApplicationState.prototype.addBill = function(bill) {
  state.billList.push(bill);
  updateCurrentView();
};
ApplicationState.prototype.setPaymentsAccessibility = function(value) {
  this.paymentsAccessible = value;
  updateCurrentView();
};
ApplicationState.prototype.addBillItem = function(billId, name, value) {
  let bill = this.getSelectedBill();
  if (!bill) {
    return;
  }
  bill.items.push({
    name: name,
    value: value
  });
  updateCurrentView();
};
ApplicationState.prototype.getOwnBillItems = function(billId) {
  let bill = state.billList.find(bill => bill.id === billId);
  if (!bill) {
    return [];
  }
  return bill.items;
};
ApplicationState.prototype.getSelectedBill = function() {
  return state.billList.find(bill => bill.id === state.selectedBillId);
};

function closeDialog() {
  var dialog = document.querySelector("dialog");
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.close();
}
function navigate(view) {
  state.currentView = view;
  if (dialog.open) {
    closeDialog();
  }
  let viewRenderer = VIEWS[view];
  contentElement.html(viewRenderer(state));
  componentHandler.upgradeDom();
}
function navigateToBill(billId) {
  state.selectedBillId = billId;
  let bill = state.billList.find(bill => bill.id === billId);
  if (!bill) {
    return;
  }
  if (bill.isSimple) {
    navigate("simpleBill");
  } else {
    navigate("bill");
  }
}
function updateCurrentView() {
  navigate(state.currentView);
}

function init() {
  contentElement = $("#content");
  state = new ApplicationState();
  navigate("list");
  let testBill = new Bill("heloo", true);
  testBill.participants.push({
    name: "Mandy",
    items: [
      {
        name: "Whisky",
        value: 300
      },
      {
        name: "Chips",
        value: 50
      }
    ]
  });
  state.addBill(testBill);
}

$(document).on("click", ".pay-swish-btn", function() {
  $(".swish-view").toggleClass("disabled");
});
$(document).on("click", ".pay-qr-btn", function() {
  $(".qr-code-view").toggleClass("disabled");
});
$(document).on("click", ".qr-code-view", function() {
  $(".qr-code-view").toggleClass("disabled");
});
$(".swish-view").click(function() {
  $(".swish-view").toggleClass("disabled");
});
$(document).ready(init);
