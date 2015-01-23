<?php

namespace SS6\ShopBundle\Model\Transport;

use SS6\ShopBundle\Model\Pricing\BasePriceCalculation;
use SS6\ShopBundle\Model\Pricing\Currency\Currency;
use SS6\ShopBundle\Model\Pricing\PricingSetting;

class TransportPriceCalculation {

	/**
	 * @var \SS6\ShopBundle\Model\Pricing\BasePriceCalculation
	 */
	private $basePriceCalculation;

	/**
	 * @var \SS6\ShopBundle\Model\Pricing\PricingSetting
	 */
	private $pricingSetting;

	/**
	 * @param \SS6\ShopBundle\Model\Pricing\BasePriceCalculation $basePriceCalculation
	 * @param \SS6\ShopBundle\Model\Pricing\PricingSetting $pricingSetting
	 */
	public function __construct(
		BasePriceCalculation $basePriceCalculation,
		PricingSetting $pricingSetting
	) {
		$this->pricingSetting = $pricingSetting;
		$this->basePriceCalculation = $basePriceCalculation;
	}

	/**
	 * @param \SS6\ShopBundle\Model\Transport\Transport $transport
	 * @param \SS6\ShopBundle\Model\Pricing\Currency\Currency $currency
	 * @return \SS6\ShopBundle\Model\Pricing\Price
	 */
	public function calculatePrice(Transport $transport, Currency $currency) {
		return $this->basePriceCalculation->calculatePrice(
			$transport->getPrice($currency)->getPrice(),
			$this->pricingSetting->getInputPriceType(),
			$transport->getVat()
		);
	}

	/**
	 * @param \SS6\ShopBundle\Model\Transport\Transport[] $transports
	 * @param \SS6\ShopBundle\Model\Pricing\Currency\Currency $currency
	 * @return \SS6\ShopBundle\Model\Pricing\Price[]
	 */
	public function calculatePricesById(array $transports, Currency $currency) {
		$transportsPrices = [];
		foreach ($transports as $transport) {
			$transportsPrices[$transport->getId()] = $this->calculatePrice($transport, $currency);
		}

		return $transportsPrices;
	}

}
