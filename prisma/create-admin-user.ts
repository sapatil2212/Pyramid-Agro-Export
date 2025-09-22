import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'admin@pyramidagro.com' }
    });

    if (existingUser) {
      console.log('Admin user already exists:', existingUser.email);
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const user = await prisma.user.create({
      data: {
        email: 'admin@pyramidagro.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created successfully:', user.email);
    console.log('Email: admin@pyramidagro.com');
    console.log('Password: admin123');
    console.log('Role: ADMIN');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
