import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'


type Props = {
  name: string
  description: string
  id: string
  publish: boolean | null
}

const workflow = ({ description, id, name, publish }: Props) => {
  return (
    <div>
      <Card className='flex justify-between items-center w-full '>
        <CardHeader className='flex flex-col gap-4'>
          <Link href={`/workflows/editor/${id}`}>
            <div className="flex flex-row gap-2">
              <Image
                src="/googleDrive.png"
                alt="Google Drive"
                height={30}
                width={30}
                className="object-contain"
              />
              <Image
                src="/notion.png"
                alt="Google Drive"
                height={30}
                width={30}
                className="object-contain"
              />
              <Image
                src="/discord.png"
                alt="Google Drive"
                height={30}
                width={30}
                className="object-contain"
              />
            </div>
            <div className="">
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </Link>
        </CardHeader>
        <div className='flex flex-col items-center ga-2 p-4'>
          <Label
            htmlFor="airplane-mode"
            className='text-muted-foreground'
          >
            On
            {/* {publish! ? 'On' : 'Off'} */}
          </Label>
          <Switch
          id='airplane-mode'
            // onClick={onPublishFlow}
          // defaultChecked={publish!}
         />
        </div>
      </Card>
    </div>
  )
}

export default workflow
