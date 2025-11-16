import { CalendarDays, List, Star, User } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
	return (
		<div className='p-4 lg:p-8 border rounded-lg grid grid-cols-5 gap-x-4 items-center bg-gradient-to-br from-sidebar to-primary/50'>
			<div className='col-span-3 space-y-4 max-md:col-span-5'>
				<div className='h-52 md:hidden w-full relative rounded-lg'>
					<Image
						src={'https://qk9g5hsrut.ufs.sh/f/xu965PmyvPo0z3TZofoOgTrMqidoG8sfm7k3ePCQ2VuYZtKa'}
						alt='Course thumbnail'
						fill
						className='object-cover rounded-lg'
					/>
				</div>
				<h1 className='text-3xl font-space-grotesk font-semibold'>Foundation</h1>
				<p className='text-sm text-muted-foreground leading-4'>
					Foundation to'liq kurs o'zbek tilida. HTML, CSS, JavaScript (BEM), Bootstrap, SASS (SCSS)
					va amaliy loyihlar barchasi bitta kurs va asosiysi mutloqo bepul. O'zingizni birinchi web
					saytingizni yashashingiz mumkin va uni hosting joylashni ham sizga batafsil ma'lumot
					beramiz.
				</p>

				<div className='flex items-center gap-x-6 flex-wrap'>
					<div className='flex items-center gap-x-2'>
						<User className='size-5' />
						<span>100 students</span>
					</div>
					<div className='flex items-center gap-x-2'>
						<CalendarDays className='size-5' />
						<span>2024, 1-August</span>
					</div>
					<div className='flex items-center gap-x-2'>
						<List className='size-5' />
						<span>20 lessons</span>
					</div>
				</div>

				<div className='flex items-center gap-x-6 flex-wrap'>
					<div>
						Duration: <span className='font-medium'>12 hours 55 minutes</span>
					</div>
					<div className='flex items-center gap-x-1'>
						<span className='text-yellow-600 font-semibold'>5</span>
						{Array.from({ length: 5 }).map((_, idx) => (
							<Star key={idx} className='size-4 text-yellow-600 fill-yellow-600' />
						))}
						<span>(120)</span>
					</div>
				</div>
			</div>
			<div className='col-span-2 relative h-64 w-full rounded-lg max-md:hidden'>
				<Image
					src={'https://qk9g5hsrut.ufs.sh/f/xu965PmyvPo0z3TZofoOgTrMqidoG8sfm7k3ePCQ2VuYZtKa'}
					alt='Course thumbnail'
					fill
					className='object-cover rounded-lg'
				/>
			</div>
		</div>
	);
};

export default Header;