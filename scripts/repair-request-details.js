import { fetchData } from './functions.js';

const customerDatabase = await fetchData('../scripts/json/customer.json');
const equipmentDatabase = await fetchData('../scripts/json/equipment.json');
const ownershipDatabase = await fetchData('../scripts/json/ownership.json');
const repairRequestDatabase = await fetchData('../scripts/json/repair-request.json')


const urlParam = new URLSearchParams(window.location.search);
//const newequipmentName = urlParam.getAll("equipment-name");
const repairRequestId = urlParam.getAll("rrid");
//const customerId = urlParam.getAll("cid");
const equipmentId = urlParam.getAll("eid");

if (repairRequestId.length > 0) {

    let repairRequest = repairRequestDatabase.find(r => r.id == repairRequestId);
    let ownership = ownershipDatabase.find(o => o.id == repairRequest.ownershipId);
    let customer = customerDatabase.find(c => c.id == ownership.customerId);
    let equipment = equipmentDatabase.find(e => e.id == ownership.equipmentId);

    $("#back-to-customer").attr("href", equipmentId > 0 ? `../pages/customer-details.html?cid=${customer.id}&eid=${equipmentId}` : 
                                                            `../pages/customer-details.html?cid=${customer.id}`)

    $("#repair-request-info").html(`Repair Request for a ${equipment.equipmentName}`);

    $("#repair-customer").html(`Customer: <b>${customer.firstName} ${customer.lastName}</b>`)
    $("#repair-date").html(`Invoice Date: <b>${repairRequest.invoiceDate}</b>`);
    $("#repair-number").html(`Invoice Number: <b>${repairRequest.invoiceNumber}</b>`);
    $("#repair-issue").html(`Issue Description: <b>${repairRequest.issueDescription}</b>`);
    $("#repair-warranty").html(`Valid Warranty?: <b>${repairRequest.hasWarranty == true ? "Yes" : "No"}</b>`);
}