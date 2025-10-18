import { Card, CardBody, Chip } from '@nextui-org/react';
import { Users, Trophy } from 'lucide-react';
import { Cybermahalla } from '@/types';

interface CybermahallaCardProps {
  mahalla: Cybermahalla;
}

export default function CybermahallaCard({ mahalla }: CybermahallaCardProps) {
  return (
    <Card className="w-36 flex-shrink-0 card-hover shadow-md" isPressable>
      <CardBody className="p-0">
        <div className="relative aspect-[3/4] w-full rounded-t-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <img
            src={mahalla.logo}
            alt={mahalla.name}
            className="w-full h-full object-cover smooth-transition hover:scale-105"
          />
          {mahalla.isOnline && (
            <div className="absolute top-2 right-2">
              <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
            </div>
          )}
          {mahalla.activeCompetitions > 0 && (
            <div className="absolute top-2 left-2">
              <Chip size="sm" className="bg-red-500 text-white font-bold">
                {mahalla.activeCompetitions} 🏆
              </Chip>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="p-2">
          <p className="text-sm font-semibold truncate text-gray-800">{mahalla.name}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <Users className="w-3 h-3" />
            <span>{mahalla.members.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 truncate">
            {mahalla.categories.slice(0, 2).join(', ')}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
