import express from "express";
import {readFile} from 'fs/promises'
import cors from "cors";
import fetch from 'node-fetch'

const parks = JSON.parse(
  await readFile(
    new URL('./parkdb.json', import.meta.url)
  )
);

const getFuelPrice = async () => {
  const query = await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')
  const json = await query.json();
  const petrol = json.stockholmslan_Preem_TabyVikingavagen_6__Taby_kyrkby__95;
  const diesel = json.stockholmslan_Tanka_OsterakerRallarvagen_9_Akersberga__diesel
  return { petrol, diesel }
}

const app = express();

app.use(cors());

app.get('/fuel', async (req, res) => {
  const fuel = await getFuelPrice();
  res.json(fuel);
})

app.get("/parks", (req, res) => {
  res.json(parks);
});

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
