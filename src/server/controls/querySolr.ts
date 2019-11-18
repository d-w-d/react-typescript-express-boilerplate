import Axios from 'axios';

/**
 * This is a simple route that just http-requests a get route operated by solr
 * To get solr running on your machine, use the `_solr_manager` script
 */
export async function querySolr() {
  const data: any = await new Promise(async (resolve, reject) => {
    const res = await Axios.get('http://localhost:8983/solr/techproducts/select?indent=on&q=*:*');
    resolve(res.data);
  });
  return data;
}
