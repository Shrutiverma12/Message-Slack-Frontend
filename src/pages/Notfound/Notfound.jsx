import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-100'>
      <Card className='text-center shadow-lg max-w-lg'>
        <CardHeader>
          <CardTitle className='text-xl'>404 Not Found</CardTitle>
          <p className='text-gray-600'>
            The page you looking for does not exist
          </p>
        </CardHeader>
        <CardContent>
          <img
            className='rounded-lg shadow-lg'
            src='https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544943.jpg?t=st=1733249031~exp=1733252631~hmac=52b3956362187b37ecf5c57c4f1c7a9d6afb831d965c81915eb466b55fd87c92&w=740'
          />
          <Button
            variant='outline'
            className='mt-4'
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
