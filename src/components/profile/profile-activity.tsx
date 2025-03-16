import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export const ProfileActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Активность</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-500">Пространств</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">48</p>
            <p className="text-sm text-gray-500">Задач</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500">Событий</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
