import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { ResponseQuotes } from './types';
import { Table } from '../../components/Table';
import { Column, Response } from '../../models';

const Quotes = () => {
  const _getAllQuotes = useApi({
    endpoint: '/quotes01',
    method: 'get',
  });

  useEffect(() => {
    handleGetAllQuotez();
  }, []);

  const handleGetAllQuotez = async (): Promise<boolean> => {
    try {
      const { payload, response }: ResponseQuotes = await _getAllQuotes();
      const code: Response['code'] = response.code;

      if (code === 200) {
        console.log('>>>', payload);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: Column[] = [
    { id: 'destinoId', label: 'Destino', align: 'left' },
  ];

  return (
    <div>
      <Table
        showCheckboxes={false}
        tableHead
        title="Cotizaciones"
        columns={columns}
        data={[]}
      />
    </div>
  );
};

export { Quotes };
