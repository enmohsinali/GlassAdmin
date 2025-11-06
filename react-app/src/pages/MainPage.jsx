import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import InstalledApps from '../components/InstalledApps';
import AppCards from '../components/AppCards';
import Modal from '../components/Modal';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageWrapper title="All Apps" showTabs={true}>
      <Hero />
      <InstalledApps onUpdateClick={() => setIsModalOpen(true)} />
      <AppCards onUpdateClick={() => setIsModalOpen(true)} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageWrapper>
  );
};

export default MainPage;
