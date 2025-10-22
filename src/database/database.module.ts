import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI loaded:', uri ? '✓ Found' : '✗ Not found');
        
        return {
          uri,
          connectionFactory: (connection) => {
            // Set up listeners FIRST
            connection.on('connected', () => {
              console.log('✓ Database connected successfully');
            });
            
            connection.on('disconnected', () => {
              console.log('⚠ Database disconnected');
            });
            
            connection.on('error', (err) => {
              console.error('✗ Database connection error:', err);
            });

            // Then check if already connected
            connection.once('open', () => {
              console.log('✓ Database connection is open and ready');
            });

            // Check current state immediately
            if (connection.readyState === 1) {
              console.log('✓ Database already connected');
            } else if (connection.readyState === 2) {
              console.log('⏳ Database connecting...');
            }
            
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}