import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { BouquetModule } from './bouquet/bouquet.module';
import { CustomerModule } from './customer/customer.module';
import { PurchaseModule } from './purchase/purchase.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BouquetDB } from './bouquet/entities/bouquet_db.entity';
import { CustomerDB } from './customer/entities/customer_db.entity';
import { SellerDB } from './seller/entities/seller_db.entity';
import { PurchaseDB } from './purchase/entities/purchase_db.entity';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ['.env.prod']
      }),
    SellerModule,
    BouquetModule,
    CustomerModule,
    PurchaseModule,
    GraphQLModule.forRoot({
      include: [BouquetModule, CustomerModule, PurchaseModule, SellerModule],
      autoSchemaFile: true,
      debug: false,
      playground: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('DB_URL'),
          synchronize: true,
          useUnifiedTopology: true,
          entities: [BouquetDB, CustomerDB, SellerDB, PurchaseDB]
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
