import logo from '../../public/logo.png'
import Image from 'next/image';
import { IoIosMail } from 'react-icons/io';
import { AiFillGithub } from "react-icons/ai";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import me from '../../public/me.webp'
import Link from 'next/link';

const Footer = ({ setViewPort }) => {
    const handleScrollToSection = (reference) => {
        setViewPort(reference)
    }
    const handleSendEmail = () => {
        const recipientEmail = 'aaronanablon6@gmail.com';
        const subject = 'Hi Aaron! Can we schedule a meeting?';
        const encodedSubject = encodeURIComponent(subject);
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodedSubject}`;
        window.open(mailtoLink, '_blank');
    };
    return (
        <>
            <div className={`bg-slate-800 relative w-full h-max z-10 py-10 grid md:grid-cols-4 text-white grid-cols-1 gap-4 items-center`}>
                <Image className='absolute bottom-0 -z-10' height={300} width={800} src={"/svg/Looper_bg.svg"} alt='bg' />
                <div className={`flex justify-center items-center`}>
                    <Image width={60} onClick={() => handleScrollToSection("homeRef")} className='bg-white rounded-full' src={logo} alt='logo' />
                </div>
                <div className='text-center'>
                    &#34;It can&#39;t beat hardwork and perseverance. Try and inspire regardless of challenges.&#34;
                </div>
                <div className='flex gap-4 justify-center items-center'>
                    <button onClick={handleSendEmail}><IoIosMail size={38} /></button>
                    {/* <Link href='https://github.com/AaronAnablon' target='_blank'><AiFillGithub size={34} /></Link>   */}
                    <Link href='https://www.facebook.com/techibot' target='_blank'><BsFacebook size={28} /></Link>
                    <Link href='https://www.linkedin.com/in/aaronpanablon' target='_blank'><BsLinkedin size={28} /></Link>
                </div>
                <div className='flex justify-center'>
                    <Image width={100} src={me} alt='me' />
                </div>
                <div className='col-span-12 flex justify-center pt-10'>
                    <p className='text-sm flex justify-center'>Alrights Reserve @2023</p>
                </div>
            </div>

        </>
    );
}

export default Footer;
