function createBillView(state) {
  const id = state.selectedBillId;
  const bill = state.billList.find(function(bill) {
    bill.id === id;
  });
  console.log(state.paymentsAccessible);
  const paymentTabClass = state.paymentsAccessible
    ? "enabled-tab"
    : "disabled-tab";
  return `
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect ">
    <div class="mdl-tabs__tab-bar">
        <a href="#bills-list" class="mdl-tabs__tab is-active">List</a>
        <div id="payment-tab">
            <a href="#payments-list"  class="mdl-tabs__tab ${paymentTabClass}">
            <div class="mdl-tooltip mdl-tooltip--large" for="payment-tab">
                List needs to be locked first!
            </div>
    
            Payments
            </a>
        </div>
 
    </div>
  
    <div class="mdl-tabs__panel tab-content-container is-active" id="bills-list">
        <ul class="demo-list-icon mdl-list" style="margin-top: -10px;">
            <li class="mdl-list__item  bill-list-item">
            <span class="mdl-list__item-primary-content section-name">
            ${renderLockButton()}
            My expenses 
            </span>
            ${renderOwnExpenses(state)}
            <div class="new-bill-entry">
                <form action="#" style="flex-basis: 3">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
                    <input id="new-bill-item-name" class="mdl-textfield__input" type="text" id="sample3">
                    <label class="mdl-textfield__label" for="sample3">Text...</label>
                    </div>
                </form>
                <!-- Numeric Textfield with Floating Label -->
                <form action="#" style="flex-basis: 1">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
                    <input id="new-bill-item-value" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
                    <label class="mdl-textfield__label" for="sample4">Amount...</label>
                    <span class="mdl-textfield__error">Input is not a number!</span>
                    </div>
                </form>
                <button id="add-bill-item-btn" style="transform: scale(0.6)" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                   <i class="material-icons">add</i>
                </button>

            </div>
            </li>
            <li class="mdl-list__item bill-list-item">
            <span class="mdl-list__item-primary-content section-name">
            <i class="material-icons mdl-list__item-icon">lock</i>
            Emilly
            </span>
            <div style="align-self: stretch">
            <ul class="demo-list-icon mdl-list">
       
              <li class="mdl-list__item bill-entry">
                    <span class="mdl-list__item-primary-content">
                    <i class="material-icons mdl-list__item-icon">remove</i>
                    Beers
                    </span>
                    <span class="bill-item-price">440 SEK</span>
                </li>
           
            </ul>
             </div>
            </li>
            <li class="mdl-list__item bill-list-item">
            <span class="mdl-list__item-primary-content section-name">
            <i class="material-icons mdl-list__item-icon">lock</i>
            Bob
            </span>
                <div style="align-self: stretch">
                        <ul class="demo-list-icon mdl-list">
                            <li class="mdl-list__item bill-entry">
                                <span class="mdl-list__item-primary-content">
                                <i class="material-icons mdl-list__item-icon">remove</i>
                                Chips
                                </span>
                                <span class="bill-item-price">20SEK</span>
                            </li>
                          <li class="mdl-list__item bill-entry">
                                <span class="mdl-list__item-primary-content">
                                <i class="material-icons mdl-list__item-icon">remove</i>
                                Glasses
                                </span>
                                <span class="bill-item-price">500SEK</span>
                            </li>
                       
                        </ul>
                </div>
            </li>
        </ul>
    </div>
    <div class="mdl-tabs__panel tab-content-container" id="payments-list">
        ${renderPayments()}
    </div>
  </div>
    `;
}
function renderPayments() {
  return `
    <div class="demo-list-action mdl-list">
        <div class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">attach_money</i>
            <span>Pay Bob 20SEK</span>
            </span>
            <button  style="transform: scale(0.6)" class="pay-swish-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">arrow_forward</i>
             </button>       
        </div>
        <div class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-avatar">attach_money</i>
            <span>Pay Emilly 400SEK</span>
            </span>
            <button  style="transform: scale(0.6)" class="pay-swish-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                <i class="material-icons">arrow_forward</i>
            </button>
        </div>
   
    </div>
`;
}

function renderOwnExpenses(state) {
  const billId = state.selectedBillId;
  const ownItems = state.getOwnBillItems(billId);
  return `
  <div style="align-self: stretch">
    <ul class="demo-list-icon mdl-list">
        ${ownItems.map(renderExpenseItem).join("")}
    </ul>
    </div>
`;
}
function renderLockButton() {
  let isLocked = state.paymentsAccessible;
  let icon = isLocked ? "lock" : "lock_open";
  return `
    <i id="lock-button" class="material-icons mdl-list__item-icon">${icon}</i>
    `;
}
function renderExpenseItem(item) {
  return `
    <li class="mdl-list__item bill-entry">
        <span class="mdl-list__item-primary-content">
        <i class="material-icons mdl-list__item-icon">remove</i>
        ${item.name}
        </span>
        <span class="bill-item-price">${item.value}SEK</span>
    </li>
    `;
}

function createSimpleBillView() {
  let bill = state.getSelectedBill();
  if (!bill) return "";
  return `
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect ">
    <div class="mdl-tabs__tab-bar">
        <a href="#bills-list" class="mdl-tabs__tab is-active">List</a>
        <div id="payment-tab">
            <a href="#payments-list"  class="mdl-tabs__tab">
            Payments
            </a>
        </div>
 
    </div>
  
    <div class="mdl-tabs__panel tab-content-container is-active" id="bills-list">
        <ul class="demo-list-icon mdl-list" style="margin-top: -10px;">
            <li class="mdl-list__item  bill-list-item">
                <span class="mdl-list__item-primary-content section-name">
                My expenses 
                </span>
                ${renderOwnExpenses(state)}
                <div class="new-bill-entry">
                <form action="#" style="flex-basis: 3">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
                    <input id="new-bill-item-name" class="mdl-textfield__input" type="text" id="sample3">
                    <label class="mdl-textfield__label" for="sample3">Text...</label>
                    </div>
                </form>
                <form action="#" style="flex-basis: 1">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
                    <input id="new-bill-item-value" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
                    <label class="mdl-textfield__label" for="sample4">Number...</label>
                    <span class="mdl-textfield__error">Input is not a number!</span>
                    </div>
                </form>
                <button id="add-bill-item-btn" style="transform: scale(0.6)" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                   <i class="material-icons">add</i>
                </button>

            </div>
            </li>
            ${bill.participants.map(renderParticipantSection).join("")}
        </ul>
    </div>
    <div class="mdl-tabs__panel tab-content-container" id="payments-list">
        ${renderSimplePayments()}
    </div>
  </div>`;
}
function renderSimplePayments() {
    return `
      <div class="demo-list-action mdl-list">
          <div class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
              <i class="material-icons mdl-list__item-avatar">attach_money</i>
              <span>Pay Bob 20SEK</span>
              </span>
              <button  style="transform: scale(0.6)" class="pay-qr-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                  <i class="material-icons">arrow_forward</i>
               </button>       
          </div>
          <div class="mdl-list__item">
              <span class="mdl-list__item-primary-content">
              <i class="material-icons mdl-list__item-avatar">attach_money</i>
              <span>Pay Emilly 400SEK</span>
              </span>
              <button  style="transform: scale(0.6)" class="pay-qr-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                  <i class="material-icons">arrow_forward</i>
              </button>
          </div>
     
      </div>
  `;
  }
function renderParticipantSection(participant) {
  const billId = state.selectedBillId;
  const ownItems = state.getOwnBillItems(billId);
  return `
    <li class="mdl-list__item  bill-list-item">
        <span class="mdl-list__item-primary-content section-name">
        ${participant.name} 
        </span>
        ${renderParticipantExpense(participant)}
        ${renderParticipantInput(participant)}
    </li>
  `;
}
function renderParticipantExpense(participant) {
  return `
    <div style="align-self: stretch">
    <ul class="demo-list-icon mdl-list">
        ${participant.items.map(renderExpenseItem).join("")}
    </ul>
    </div>`;
}
function renderParticipantInput(participant) {
  return `
    <div class="new-bill-entry">
        <form action="#" style="flex-basis: 3">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
            <input data-participant-input="${participant.name}" class="new-bill-item-name mdl-textfield__input" type="text" id="sample3">
            <label class="mdl-textfield__label" for="sample3">Text...</label>
            </div>
        </form>
        <form action="#" style="flex-basis: 1">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: auto">
            <input data-participant-input="${participant.name}" class="new-bill-item-value mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
            <label class="mdl-textfield__label" for="sample4">Number...</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
            </div>
        </form>
        <button data-participant-name="${participant.name}" style="transform: scale(0.6)" class="participant-add-bill-item-btn mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
        <i class="material-icons">add</i>
        </button>
    </div>`;
}
$(document).on("click", "#add-bill-item-btn", function() {
  let value = $("#new-bill-item-value").val();
  let name = $("#new-bill-item-name").val();
  state.addBillItem(state.selectedBillId, name, value);
});
$(document).on('click', '.participant-add-bill-item-btn', function() {
  let participantName = this.attributes["data-participant-name"].value;
  let value = $(`.new-bill-item-value[data-participant-input="${participantName}"]`).val();
  let name = $(`.new-bill-item-name[data-participant-input="${participantName}"]`).val();
    let bill = state.getSelectedBill();
    bill.addItemByParticipantName(participantName, value, name);
})
$(document).on("click", "#lock-button", function() {
  state.setPaymentsAccessibility(!state.paymentsAccessible);
});
