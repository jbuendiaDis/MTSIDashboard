/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  PayloadDetailQuote,
  ResponseDetailQuote,
} from './types';
import { useApi } from '../../hooks/useApi';
import { Response } from '../../models';
import { useParams } from 'react-router-dom';
import { Table } from '../../components/Table';

const DetailQuote = () => {
  const { id } = useParams();
  const [dataTable, setDataTable] = useState<PayloadDetailQuote['data']>([]);
  const idQuote: string | undefined = id ? id : '';

  const _getQuoteFolio = useApi({
    endpoint: '/quotes01',
    method: 'get',
  });

  useEffect(() => {
    if (idQuote !== '') handleGetQuoteFolio(idQuote);
  }, [idQuote]);

  const handleGetQuoteFolio = async (id: string): Promise<boolean> => {
    try {
      console.log('id', id);
      const { payload, response }: ResponseDetailQuote = await _getQuoteFolio({
        // urlParam: id,
        urlParam: 2,
      });
      const dataResponse: PayloadDetailQuote['data'] = payload.data;
      const code: Response['code'] = response.code;

      if (code === 200) {
        setDataTable(dataResponse);
      }
      return true;
    } catch (error) {
      return false;
    }
  };


  console.log('STATE', dataTable);

  return (
    <>
      <Table
        showCheckboxes={false}
        tableHead
        title="Cotizador"
        data={[]}
        columns={[]}
      />
    </>
  );
};

export { DetailQuote };
